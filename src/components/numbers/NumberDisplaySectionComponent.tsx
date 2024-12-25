import React from 'react';
import { NumberDisplayProps } from '../../api/numbers';
import { isPrime } from '../../shared/util';

const NumberDisplaySectionComponent: React.FC<NumberDisplayProps> = ({
    numbers,
    editable,
    highlightPrimes,
    onNumberChange,
}) => {
    return (
        <div className={`grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 xl:grid-cols-10`}>
            { numbers.map((num, index) => (
                <div
                    key={ index }
                    className={ `w-full text-center flex items-center justify-center ${ highlightPrimes && isPrime(num) ? 'bg-green-100' : ''
                        }` }
                >
                    <input
                        type="number"
                        value={ num || '' }
                        readOnly={ !editable }
                        onChange={ (e) =>
                            onNumberChange &&
                            onNumberChange(index, parseInt(e.target.value || '0', 10))
                        }
                        className="w-12 h-12 border border-gray-300 rounded shadow  text-center bg-transparent focus:outline-none"
                    />
                </div>
            )) }
        </div>
    );
};

export default NumberDisplaySectionComponent;