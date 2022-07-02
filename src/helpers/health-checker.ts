import { default as axios } from 'axios';

function allSettled (promises: any) {
  const wrappedPromises = promises.map((p: any) => Promise.resolve(p)
    .then(
      val => ({ state: 'fulfilled', value: val }),
      err => ({ state: 'rejected', reason: err })
    )
  );

  return Promise.all(wrappedPromises);
}


export const healthChecker = async (healthChecks: any) => {
  const checkPromises: any[] = [];

  (healthChecks || []).forEach((healthCheck: any) => {
    let uri = `${healthCheck.protocol}://${healthCheck.host}`;

    if (healthCheck.port) {
      uri += `:${healthCheck.port}`;
    }

    uri += healthCheck.path;

    checkPromises.push(axios({
      url: uri,
      method: 'GET'
    }));
  });

  const checkResults: any[] = [];

  return allSettled(checkPromises).then(results => {
    results.forEach((result, index) => {
      if (result.state === 'rejected') {
        checkResults.push({
          path: healthChecks[index].path,
          status: 'failed'
        });
      } else {
        checkResults.push({
          path: healthChecks[index].path,
          status: 'ok'
        });
      }
    });

    return checkResults;
  });
};
