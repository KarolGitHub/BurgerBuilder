import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);
  const { request, response } = httpClient.interceptors;
  const reqInterceptor = request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = response.use(
    (res) => res,
    (err) => {
      setError(err);
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    return () => {
      request.eject(reqInterceptor);
      response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor, request, response]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
