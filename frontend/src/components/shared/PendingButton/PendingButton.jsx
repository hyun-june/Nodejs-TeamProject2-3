import { Button } from "../Button/Button";
import "./PendingButton.css";

export const PendingButton = ({ isPending, children, ...props }) => {
    return (
        <Button {...props}>
            { isPending ? <div className="loader"/> : children }
        </Button>
    );
};