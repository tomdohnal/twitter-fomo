// https://github.com/pmndrs/react-spring/issues/1078#issuecomment-677528907
// eslint-disable-next-line @typescript-eslint/no-var-requires
const replace = require('replace-in-file');

const removeAllSideEffectsFalseFromReactSpringPackages = async () => {
  try {
    await replace({
      files: 'node_modules/@react-spring/*/package.json',
      from: `"sideEffects": false`,
      to: `"sideEffects": true`,
    });

    // console.log(results); // uncomment to log changed files
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      'error while trying to remove string "sideEffects:false" from react-spring packages',
      e,
    );
  }
};

removeAllSideEffectsFalseFromReactSpringPackages();
