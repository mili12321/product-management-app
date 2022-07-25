import defaultImage from '../../../assets/imgs/image-not-available.png'

export const ItemImage = ({url}:{url?:string}) => {

    return (
        <div className="product-image-wrapper flex place-center">
            <img 
            className={`${!url?'default-image':''}`}
            src={ !url ? defaultImage : url } 
            alt=''
            />
        </div>
    )
}