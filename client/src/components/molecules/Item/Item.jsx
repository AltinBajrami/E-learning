import './Item.scss';

const Item = ({ imgUrl, date, blog, personName, personPhoto }) => {
  return (
    <div className="blog__container-feature">
      <div className="blog__image" id="holder">
        <img src={imgUrl} alt="blog_image"  />
      </div>
      <div className="blog__container-title">
        <div className="blog__container-title-info">
          <p>{date}</p>
          <p>|</p>
          <div className="person-info">
            <img src={personPhoto} alt="person_photo" className="person-photo" />
            <p>{personName}</p>
          </div>
        </div>
        <h1>{blog}</h1>
      </div>
    </div>
  );
};

export default Item;
