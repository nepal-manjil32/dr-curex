import React, { useState, useEffect } from 'react';
import './BMI.css';
import Minimalnav from '../../components/minimalnav/Minimalnav';

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 24.9) return 'Normal weight';
  if (bmi < 29.9) return 'Overweight';
  return 'Obese';
};

const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [units, setUnits] = useState('metric'); // 'metric' or 'imperial'
  const [animation, setAnimation] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');
    
    let calculatedBMI;
    const w = parseFloat(weight);
    let h;
    
    if (units === 'metric') {
      h = parseFloat(height) / 100; // convert cm to meters
    } else {
      // Imperial: weight in lbs, height in inches
      h = parseFloat(height);
      calculatedBMI = (w / (h * h)) * 703;
    }

    if (!w || !h || w <= 0 || h <= 0) {
      setError('Please enter valid positive numbers for weight and height.');
      setBMI(null);
      setCategory('');
      return;
    }

    if (units === 'metric') {
      calculatedBMI = w / (h * h);
    }
    
    setBMI(calculatedBMI.toFixed(1));
    setCategory(getBMICategory(calculatedBMI));
    setAnimation(true);
  };
  
  useEffect(() => {
    if (animation) {
      const timer = setTimeout(() => setAnimation(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animation]);

  const getResultColor = () => {
    if (!category) return '';
    if (category === 'Underweight') return '#1976d2';
    if (category === 'Normal weight') return '#388e3c';
    if (category === 'Overweight') return '#fbc02d';
    return '#d32f2f';
  };

  return (
    <div className="bmi-container">
      <Minimalnav />
      <div className="bmi-calculator">
        <div className="bmi-header">
          <h1>BMI Calculator</h1>
          <p>Check if your weight is healthy for your height</p>
        </div>
        
        <div className="bmi-card">
          <div className="units-toggle">
            <button 
              className={units === 'metric' ? 'active' : ''} 
              onClick={() => setUnits('metric')}
            >
              Metric
            </button>
            <button 
              className={units === 'imperial' ? 'active' : ''} 
              onClick={() => setUnits('imperial')}
            >
              Imperial
            </button>
          </div>
          
          <form className="bmi-form" onSubmit={handleCalculate}>
            {error && <div className="bmi-error">{error}</div>}
            
            <div className="input-group">
              <label htmlFor="weight">
                Weight {units === 'metric' ? '(kg)' : '(lbs)'}:
              </label>
              <input
                onChange={e => setWeight(e.target.value)}
                type="number"
                placeholder={`Enter your weight in ${units === 'metric' ? 'kilograms' : 'pounds'}`}
                name="weight"
                id="weight"
                value={weight}
                min="1"
                step="any"
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="height">
                Height {units === 'metric' ? '(cm)' : '(inches)'}:
              </label>
              <input
                onChange={e => setHeight(e.target.value)}
                type="number"
                placeholder={`Enter your height in ${units === 'metric' ? 'centimeters' : 'inches'}`}
                name="height"
                id="height"
                value={height}
                min="1"
                step="any"
                required
              />
            </div>
            
            <button type="submit" className="calculate-btn">Calculate BMI</button>
          </form>
          
          {bmi && (
            <div className={`bmi-result ${animation ? 'animate' : ''}`}>
              <div className="result-circle" style={{ backgroundColor: getResultColor() }}>
                <span className="bmi-value">{bmi}</span>
                <span className="bmi-label">Your BMI</span>
              </div>
              <div className="category-info">
                <h3>You are in the <span style={{ color: getResultColor() }}>{category}</span> range</h3>
                <p className="bmi-explanation">
                  {category === 'Underweight' && 'Being underweight could indicate nutritional deficiencies. Consider consulting with a healthcare professional.'}
                  {category === 'Normal weight' && 'Your BMI is within the healthy weight range. Keep up the good work!'}
                  {category === 'Overweight' && 'Being overweight may increase your risk of health problems. Consider healthy lifestyle changes.'}
                  {category === 'Obese' && 'Obesity is associated with higher health risks. Consider consulting with a healthcare professional.'}
                </p>
              </div>
            </div>
          )}
          
          <div className="bmi-info">
            <h3>What is BMI?</h3>
            <p>Body Mass Index (BMI) is a value derived from a person's weight and height. It provides a simple numeric measure of a person's thickness or thinness, allowing health professionals to discuss weight problems more objectively with their patients.</p>
            <div className="bmi-ranges">
              <div className="range"><span className="dot underweight"></span> Underweight: &lt; 18.5</div>
              <div className="range"><span className="dot normal"></span> Normal weight: 18.5 - 24.9</div>
              <div className="range"><span className="dot overweight"></span> Overweight: 25 - 29.9</div>
              <div className="range"><span className="dot obese"></span> Obese: ≥ 30</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMI;