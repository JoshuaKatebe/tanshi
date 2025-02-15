export default function Card({ image, title, description, link }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
        {image && <img src={image} alt={title} className="rounded-t-lg h-48 w-full object-cover" />}
        <h3 className="text-xl font-bold mt-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <a href={link} className="text-indigo-600 mt-4 block hover:underline hover:text-indigo-800 transition duration-200">
          Learn more →
        </a>
      </div>
    );
  }
  