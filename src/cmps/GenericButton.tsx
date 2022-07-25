interface Props {
    name: string;
    handelClick: (event: any) => void;
}

export const GenericButton = ({name, handelClick}:Props) => {
    return (
        <div className="main-btn" onClick={handelClick}>
            {name}
        </div>
    )
}