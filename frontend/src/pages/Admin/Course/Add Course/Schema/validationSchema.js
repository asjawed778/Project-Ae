import fifthStepValidationSchema from "./fifthStepValidationSchema";
import firstStepValidationSchema from "./firstStepValidationSchema";
import { fourthStepValidationSchema } from "./fourthStepValidationSchema";
import secondStepValidationSchema from "./secondStepValidationSchema";
import { thirdStepValidationSchema } from "./thirdStepValidationSchema";

export const getValidationSchema = (step) => {
    switch (step) {
      case 1:
        return firstStepValidationSchema;
      case 2:
        return secondStepValidationSchema;
      case 3:
        return thirdStepValidationSchema;
      case 4:
        return fourthStepValidationSchema;
      case 5:
        return fifthStepValidationSchema;
      default:
        return firstStepValidationSchema;
    }
  };