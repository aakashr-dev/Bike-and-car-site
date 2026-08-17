import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function EmiCalculator({ defaultAmount = 300000 }) {
  const [loanAmount, setLoanAmount] = useState(defaultAmount);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenureYears, setTenureYears] = useState(3);

  // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const tenureMonths = tenureYears * 12;

  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#ff5500]/20 border border-[#ff5500]/40 flex items-center justify-center text-[#ff5500]">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-white font-['Outfit']">Instant Auto Loan & EMI Calculator</h3>
          <p className="text-xs text-gray-400">Calculate estimated monthly EMI payments for pre-owned bikes & cars</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sliders */}
        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
              <span>Loan Amount</span>
              <span className="text-[#ff5500] font-bold font-['Outfit'] text-sm">₹{loanAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={50000}
              max={3000000}
              step={10000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-[#ff5500] cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
              <span>Interest Rate (%)</span>
              <span className="text-[#ff5500] font-bold font-['Outfit'] text-sm">{interestRate}% p.a.</span>
            </div>
            <input
              type="range"
              min={7.5}
              max={16}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#ff5500] cursor-pointer"
            />
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
              <span>Tenure (Years)</span>
              <span className="text-[#ff5500] font-bold font-['Outfit'] text-sm">{tenureYears} Years ({tenureMonths} Months)</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 7].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setTenureYears(yr)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    tenureYears === yr
                      ? 'bg-[#ff5500] text-white shadow-md'
                      : 'bg-[#0a0a0c] text-gray-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {yr} yr
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* EMI Result Summary Card */}
        <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden">
          <div className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">ESTIMATED MONTHLY EMI</div>
          <div className="text-4xl font-black text-white font-['Outfit'] text-gradient-orange">
            ₹{isNaN(emi) ? 0 : emi.toLocaleString()} <span className="text-sm font-normal text-gray-400">/ month</span>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-left text-xs">
            <div>
              <span className="text-gray-400 block">Total Interest Payable:</span>
              <span className="text-white font-bold font-['Outfit'] text-sm">₹{totalInterest.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Total Payable Amount:</span>
              <span className="text-white font-bold font-['Outfit'] text-sm">₹{totalPayment.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
