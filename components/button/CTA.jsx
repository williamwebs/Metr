import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CTA = ({ title, icon }) => {
  return (
    <button type="submit" className="button">
      {title}

      {icon && <FontAwesomeIcon icon={faArrowRight} className="w-3" />}
    </button>
  );
};

export default CTA;
