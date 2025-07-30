import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BackButton = ({ label, title, href }) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm">
      <Link to={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
