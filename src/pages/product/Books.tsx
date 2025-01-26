import CategoryItem from "../../components/ui/CategoryItem";


const Books = () => {
    return (
        <div className="pt-10">
            <h1 className="text-[20px] font-bold text-center mb-4">All Books</h1>
            <CategoryItem item="Book" />
        </div>
    );
};

export default Books;