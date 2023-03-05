import NavigationBar from "../components/navigationBar/NavigationBar";

interface Props {
  children: React.ReactNode;
}

// AppWrapper is applied to prevent the necessity to constantly refresh the navbar. Also ensures we maintain DRY code
const AppWrapper = ({ children }: Props) => {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

export default AppWrapper;
