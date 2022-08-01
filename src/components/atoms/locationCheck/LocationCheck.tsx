type locationCheckProps = {
  pathname: string;
};

const LocationCheck = (location: locationCheckProps) => {
  let pathName;

  if (location.pathname === `/dashboard`) {
    pathName = 'Dashboard';
  }
  if (location.pathname === `/admin/user-invitation`) {
    pathName = 'User invitation';
  }

  return pathName;
};

export default LocationCheck;
