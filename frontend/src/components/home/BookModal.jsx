import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
    return (
        <div
            className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="w-[660px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
            >
                <AiOutlineClose
                    className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
                    onClick={onClose}
                />

                <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
                    {book.publishYear}
                </h2>
                <h4 className="my-2 text-gray-500">{book._id}</h4>

                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.title}</h2>
                </div>

                <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.author}</h2>
                </div>

                <p className="mt-4">Anything you want to show</p>
                <p className="my-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis leo
                    ac eros mollis facilisis. Interdum et malesuada fames ac ante ipsum
                    primis in faucibus. Sed id arcu ligula. Vestibulum auctor augue odio,
                    vitae iaculis sem mollis in. Donec arcu ipsum, tempus eu enim id,
                    egestas aliquet odio. Nullam vestibulum aliquet porttitor. Donec
                    auctor nibh sit amet odio luctus, cursus vehicula ex cursus. Fusce
                    fermentum tellus at lectus condimentum, quis mollis nunc pharetra.
                    Vivamus tristique convallis varius. Curabitur sodales mi et libero
                    ornare tristique. Aliquam quis consequat nibh. Nam facilisis dignissim
                    imperdiet. Curabitur vel est sodales est elementum placerat. Sed nec
                    tempor mauris. Phasellus leo tortor, blandit sed porttitor in, tempor
                    non orci. Pellentesque dapibus pharetra quam id luctus.
                </p>
            </div>
        </div>
    );
};

export default BookModal;
