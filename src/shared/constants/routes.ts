const routes = {
  home: "/",
  destination: (destinationName: string) =>
    `/destination?name=${destinationName}`,
};

export default routes;
