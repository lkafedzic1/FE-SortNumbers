import React, { ChangeEvent, useState } from 'react';
import { useSortNumbers } from '../../api/numbers/numbersApi';
import { SortNumbersRequest } from '../../api/numbers';
import NumberDisplaySectionComponent from './NumberDisplaySectionComponent';

const SortedNumbersComponent: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>(Array(10).fill(0));
  const [sortedNumbers, setSortedNumbers] = useState<number[]>([]);
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);
  const [filterCondition, setFilterCondition] = useState<string>('<');
  const [filterValue, setFilterValue] = useState<number | ''>('');
  const [apiError, setApiError] = useState<string | null>(null);
  const sortNumbersMutation = useSortNumbers();

  const sendDataToServer = async () => {
    setApiError(null);

    const request = {
      numbers: numbers.filter((num) => num !== 0),
    } as SortNumbersRequest;

    if (filterEnabled && filterValue !== '') {
      request.filterType = filterCondition;
      request.filterValue = filterValue;
    }

    await sortNumbersMutation.mutateAsync(request).then((response) => {
      setSortedNumbers(response.sortedNumbers);
    })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          setApiError(err.response.data.errors.map((error: any) => error.msg).join(', '));
        }
      });
  };

  const handleInputChange = (index: number, value: number) => {
    const updatedNumbers = [...numbers];
    updatedNumbers[index] = value;
    setNumbers(updatedNumbers);
  };

  const fillRandomData = () => {
    const randomNumbers = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100)
    );
    setNumbers(randomNumbers);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-lg font-semibold p-6 text-center">Enter or Fill Fields With Random Data</h3>
      <div>
        <NumberDisplaySectionComponent
          numbers={ numbers }
          editable={ true }
          highlightPrimes={ false }
          onNumberChange={ handleInputChange }
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={ fillRandomData }
          className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
        >
          Fill Random Data
        </button>
        <button
          onClick={ sendDataToServer }
          className="px-4 py-2 text-white bg-green-500 rounded shadow hover:bg-green-600"
        >
          Send Data
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-center">Additional Filter</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={ filterCondition }
            onChange={ (e: ChangeEvent<HTMLInputElement>) =>
              setFilterCondition(e.target.value)
            }
            placeholder="<, >, ="
            maxLength={ 1 }
            className="w-14 text-center border border-gray-300 rounded"
          />
          <input
            type="number"
            value={ filterValue }
            onChange={ (e: ChangeEvent<HTMLInputElement>) =>
              setFilterValue(e.target.value === '' ? '' : parseInt(e.target.value, 10))
            }
            placeholder="Value"
            className="w-20 text-center border border-gray-300 rounded"
          />
          <div
            onClick={() => setFilterEnabled(!filterEnabled)}
            className={`w-14 h-8 flex items-center rounded-full cursor-pointer ${
              filterEnabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                filterEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-lg font-semibold text-center">Results</h1>
        <NumberDisplaySectionComponent
          numbers={ sortedNumbers }
          editable={ false }
          highlightPrimes={ true }
        />
        { apiError && (
          <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
            <strong>Error:</strong> { apiError }
          </div>
        ) }
      </div>
    </div>
  );
};

export default SortedNumbersComponent;