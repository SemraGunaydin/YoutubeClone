import { Link } from "react-router-dom";
import { categories } from "../../constants";

const Sidebar = ({ selectedCat }) => {
  return (
    <aside>
      {/* Iterate over categories and render each item */}
      {categories.map((category, index) => (
        <Link to={`/?category=${category.path}`} key={index}>
          <div
            className={`flex items-center gap-2 py-4 px-2 md:px-3 md:text-lg cursor-pointer rounded-md hover:bg-[#2d2d2d] transition ${
              (category.path === selectedCat || (category.path === "/" && !selectedCat)) && "bg-[#242424]"
            }`}
          >
            <span className="max-md:text-2xl">{category.icon}</span>
            <span className="max-md:hidden">{category.name}</span>
          </div>
          {/* Render a divider if needed */}
          {category.divider && <hr />}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;