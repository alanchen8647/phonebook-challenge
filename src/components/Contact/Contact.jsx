import "./Contact.css";
import femaleAvatar from "../../assets/femaleAvatar.png";
import maleAvatar from "../../assets/maleAvatar.png";
import elderFemaleAvatar from "../../assets/elderFemaleAvatar.png";
import elderMaleAvatar from "../../assets/elderMaleAvatar.png";
import PlaceHolderAvatar from "../../assets/placeHolderAvg.png";

const Contact = (props) => {
    const {id, name, phone, email, avatar } = props;
    return (
            <li className="contact-card" key={id}>
                <img
                    className="contact-card__avatar"
                    src={
                        avatar === "f"
                            ? femaleAvatar
                            : avatar === "m"
                              ? maleAvatar
                              : avatar === "ef"
                                ? elderFemaleAvatar
                                : avatar === "em"
                                  ? elderMaleAvatar
                                  : PlaceHolderAvatar
                    }
                    alt={`${name}'s avatar`}
                />
                <h3 className="contact-card__name">{name}</h3>
                <p className="contact-card__phone">{phone}</p>
                <p className="contact-card__email">{email}</p>
            </li>
    );
};

export default Contact;
