import { ReactSVG } from 'react-svg';

function CategoryButton(props) {

    const { id, label, icon, clickHook, selected } = props;

    const handleClick = () => {
        clickHook(id, selected);
    };

    /* 
        NOTE: 
        In order to correctly display the svg icons from the db, the svg icon must be converted 
        from html component to url (a possible website can be: https://yoksel.github.io/url-encoder/).
        After that it can be saved into the db in the correct position.
    */

    return (
        selected ?
            <div className='chipbox-selected' key={id} onClick={handleClick}>
                <p className='category-label-selected'>{label}</p>
                <ReactSVG className='svg-icon' src={icon} />
            </div> :

            <div className='chipbox' key={id} onClick={handleClick}>
                <p className='category-label'>{label}</p>
                <ReactSVG className='svg-icon' src={icon} />
            </div>
    );
}

export default CategoryButton;