import React ,{useEffect,useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_API = `https://api.apilayer.com/exchangerates_data/convert?apikey=G4VZn38Xnj2AkNpc7mZqgMxme6plg3cl`
function App() {
  const [currencyOption,setCurrencyOption] = useState([])
  // console.log(currencyOption)
   const [fromCurrency,setFromCurrency] = useState()
   const [toCurrency,setToCurrency] = useState()
   const [exchangeRate,setExchangeRate]=useState()
   const [amount,setAmount]=useState(1)
   const[amountInFromCurrency,setAmountInFromCurrency] =useState(true)

  //  console.log(exchangeRate)

  let toAmount,fromAmount

 if(amountInFromCurrency){

  fromAmount = amount
  toAmount=amount * exchangeRate

 }
 else{
  toAmount=amount
  fromAmount=amount / exchangeRate
 }

  
  useEffect(()=>{
    fetch(BASE_API).then(res => res.json())
    .then(data =>{
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOption([data.base,...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
       
  },[])
 

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_API}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

 function handleFromAmountChange(e){
 setAmount(e.target.value)
 setAmountInFromCurrency(true)
 }

 function handleToAmountChange(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(false)
  }



  return (
   <>
   <h1>Currency Converter</h1>
   <CurrencyRow currencyOption={currencyOption}
   selectedCurrency={fromCurrency}
   onChangeCurrency={e=>setFromCurrency(e.target.value)} 
   amount={fromAmount}
   onChangeAmount={handleFromAmountChange}
    />

   <div className='equal'>=</div>
   <CurrencyRow currencyOption={currencyOption}
   selectedCurrency={toCurrency}
   onChangeCurrency={e=>setToCurrency(e.target.value)} 
   amount={toAmount}

   onChangeAmount={handleToAmountChange}
   />
   </>
  );
}

export default App;
