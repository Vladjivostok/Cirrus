type locationCheckProps = {
  pathname: string;
};

const LocationCheck = (location: locationCheckProps) => {
  let pathName;

  if (location.pathname === `/dashboard`) {
    pathName = 'Dashboard Page';
  }
  if (location.pathname === `/admin/user-invitation`) {
    pathName = 'User Invitation Page';
  }

  return pathName;
};

export default LocationCheck;
