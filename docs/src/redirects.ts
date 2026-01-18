import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  const { pathname } = window.location;
  if (pathname === '/react-dialog-hub/' || pathname === '/react-dialog-hub') {
    window.location.replace('/react-dialog-hub/docs/getting-started');
  }
}
