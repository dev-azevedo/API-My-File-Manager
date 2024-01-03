// import { cnpj, cpf } from "cpf-cnpj-validator";
import moment from "moment";
import { mask } from "remask";

class Helper {
  setMaskCpfCnpj(input: string) {
    // if (input && input.length > 0) {
    //   return input.length === 11 ? cpf.format(input) : cnpj.format(input);
    // }

    return input;
  }

  setMaskPhone(input: string) {
    if (input && input.length > 0) {
      return mask(input, ["(99) 9999-9999", "(99) 99999-9999"]);
    }

    return input;
  }

  setMaskCep(input: string) {
    if (input && input.length > 0) {
      return mask(input, "99999-999");
    }

    return input;
  }

  autoCapitalize(input: string) {
    if (input && input.length > 0) {
      let words = input.split(" ");

      for (let i = 0; i < words.length; i++) {
        let word = words[i];

        if (word.length > 0) {
          words[i] = word[0].toUpperCase() + word.slice(1).toLowerCase();
        }
      }

      return words.join(" ");
    }

    return input;
  }

  toDay() {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  validateDaysOfRegister = (firstDate: Date, numberOfDay: number) => {
    const toDay = moment.utc();
    const dateClient = moment.utc(firstDate);

    const diferencaEmDias = toDay.diff(dateClient, "days");

    return diferencaEmDias === numberOfDay;
  };
}

export default new Helper();
