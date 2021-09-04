function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function getAverageSalary(workersMap) {
      let iterable = Array.from(workersMap.entries());

      let sumOfSalaries = 0;

      for (let worker of iterable) {
         sumOfSalaries += Number(worker[1]);
      }

      return sumOfSalaries / iterable.length;
   }

   function findBestSalary(bestRestaurantWorkers) {
      let salaries = Array.from(bestRestaurantWorkers.values());

      let bestSalary = Number.MIN_SAFE_INTEGER;

      for (let salary of salaries) {
         if (Number(salary) > bestSalary) {
            bestSalary = Number(salary);
         }
      }

      return bestSalary;
   }

   function onClick() {
      let textAreaElement = document.querySelector('#inputs textarea');

      let text = textAreaElement.value;

      let inputArray = JSON.parse(text);

      // console.log(inputArray);

      let map = new Map();

      for (let i = 0; i < inputArray.length; i++) {
         let info = inputArray[i].split(' - ');

         let restaurantName = info[0];

         let restraurantWorkersInfo = info[1].split(', ');

         if (map.has(restaurantName)) {
            // Get the currentMap
            let currentRestaurantWorkersMap = map.get(restaurantName);

            for (let j = 0; j < restraurantWorkersInfo.length; j++) {
               let currentWorkerData = restraurantWorkersInfo[j].split(' ');
               currentRestaurantWorkersMap.set(currentWorkerData[0], Number(currentWorkerData[1]));
            }

         } else {
            // Get the currentMap
            let restraurantWorkersMap = new Map();

            for (let j = 0; j < restraurantWorkersInfo.length; j++) {
               let currentWorkerData = restraurantWorkersInfo[j].split(' ');
               restraurantWorkersMap.set(currentWorkerData[0], Number(currentWorkerData[1]));
            }

            map.set(restaurantName, restraurantWorkersMap);
         }
      }

      let bestRestaurant;

      let maxAverageSalary = Number.MIN_SAFE_INTEGER;

      let iterable = Array.from(map.entries());

      for (let restaurant of iterable) {

         let name = restaurant[0];

         let workers = restaurant[1];

         if (getAverageSalary(workers) > maxAverageSalary) {
            maxAverageSalary = getAverageSalary(workers);
            bestRestaurant = restaurant;
         }
      }

      let bestRestaurantElement = document.querySelector('#bestRestaurant p');

      bestRestaurantElement.textContent = `Name: ${bestRestaurant[0]} Average Salary: ${getAverageSalary(bestRestaurant[1]).toFixed(2)} Best Salary: ${findBestSalary(bestRestaurant[1]).toFixed(2)}`;

      let bestRestaurantWorkersParagraph = document.querySelector('#workers p');

      console.log(bestRestaurant[1]);

      let sortedWorkersByHighestSalary = Array.from(bestRestaurant[1].entries()).sort((a, b) => b[1] - a[1]);

      for (let worker of sortedWorkersByHighestSalary) {

         bestRestaurantWorkersParagraph.textContent += `Name: ${worker[0]} With Salary: ${worker[1]} `;

      }

      bestRestaurantWorkersParagraph.textContent = bestRestaurantWorkersParagraph.textContent.trim();
   }
}