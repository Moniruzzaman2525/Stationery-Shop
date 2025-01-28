import artAndCraft from '../../assets/images/art-craft.png';
import books from '../../assets/images/books.png';
import stationery from '../../assets/images/stationery.png';
import classRoom from '../../assets/images/classroom-suplies.png';
import { Link } from 'react-router-dom';

const categories = [
    { id: 1, image: books, label: "Books", path: '/books' },
    { id: 2, image: artAndCraft, label: "Art And Craft", path: '/art-craft' },
    { id: 3, image: stationery, label: "Stationery", path: '/stationery' },
    { id: 4, image: classRoom, label: "Classroom Supplies", path: '/classroom-supplies' },
];

const Category = () => {
    return (
        <div className="py-18 px-6 bg-[#F9F9FB] md:px-40">
            <div className='mb-10 '>
                <h1 className="text-[20px] font-bold text-center mb-2">Featured Category</h1>
                <p className="text-[15px] text-center">Get Your Desired Product from Featured Category!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link key={category.id} to={category.path}>
                        <div
                            className="flex flex-col cursor-pointer items-center text-center bg-white rounded-lg p-4"
                            style={{
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <img
                                src={category.image}
                                alt={category.label}
                                className="w-full h-auto rounded-lg mb-4"
                            />
                            <p className="text-lg font-medium">{category.label}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Category;
