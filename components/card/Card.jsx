import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ icon, title, description }) => {
  return (
    <div className="border p-6 rounded-lg flex flex-col gap-4">
      <FontAwesomeIcon icon={icon} className="w-8 h-8 text-gray-700" />

      <h3 className="font-bold text-xl text-gray-900">{title}</h3>

      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default Card;
