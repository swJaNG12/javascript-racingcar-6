import { Console, Random } from '@woowacourse/mission-utils';
import { CarNameValidator } from './validator.js';

class App {
  async play() {
    try {
      const carNamesString = await this.getUserInputCarNames();
      const validationErrorMessage = CarNameValidator.validate(carNamesString);
      if (validationErrorMessage) {
        throw new Error(validationErrorMessage);
      }

      const carNameArray = carNamesString.split(',');
      const attemptForwardCount = await this.getUsetInputForwardCount();
      Console.print(attemptForwardCount);
      Console.print(carNameArray);

      let carStatusArray = this.convertCarNamesToObject(carNameArray);
      Console.print(carStatusArray);

      this.race(carStatusArray, attemptForwardCount);
    } catch (error) {
      console.error(error);
    }
  }

  async getUserInputCarNames() {
    return await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분'
    );
  }
  async getUsetInputForwardCount() {
    return await Console.readLineAsync('시도할 횟수는 몇 회인가요?');
  }
  race(carArray, attemptCount) {
    let cars = [...carArray];
    for (let i = 0; i < parseInt(attemptCount); i++) {
      cars = cars.map((car) => {
        return {
          name: car.name,
          status: this.attepmtMove(car.status),
        };
      });
      this.printRaceProgress(cars);
    }
  }
  printRaceProgress(carArray) {
    carArray.forEach((car) => {
      Console.print(`${car.name} : ${car.status}`);
    });
    Console.print('\n');
  }
  convertCarNamesToObject(array) {
    return array.map((name) => {
      return { name, status: '' };
    });
  }
  attepmtMove(status) {
    const randomNumber = Random.pickNumberInRange(0, 9);
    if (randomNumber >= 4) {
      return status + '-';
    }
    return status;
  }
}

export default App;
