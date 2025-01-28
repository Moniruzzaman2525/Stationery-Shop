import CategoryItem from "../../components/ui/CategoryItem";


const Books = () => {
    return (
        <div className="py-24 px-6 md:px-30">
            <h1 className="text-[20px] font-bold text-center mb-4">All Books</h1>
            <CategoryItem item="Books" />
        </div>
    );
};

export default Books;