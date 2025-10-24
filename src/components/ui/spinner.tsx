import {Loader2} from "lucide-react";

const Spinner = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <Loader2 className="animate-spin rounded-full h-5 w-5" />
        </div>
    );
};

export default Spinner;