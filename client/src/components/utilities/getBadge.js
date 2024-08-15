import Adanced from '../../assets/images/badges/advanced.png';
import Expert from '../../assets/images/badges/expert.png';
import Intermediate from '../../assets/images/badges/intermediate.png';
import Beginner from '../../assets/images/badges/beginner.png';

export const getBadge = (level) => {
  if (level >= 10) {
    return Expert;
  } else if (level >= 7) {
    return Adanced;
  } else if (level >= 4) {
    return Intermediate;
  } else {
    return Beginner;
  }
};
