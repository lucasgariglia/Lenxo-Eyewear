import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate processing
    setTimeout(() => {
        navigate('/success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-12 px-6">
      <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Form */}
        <div>
           <h1 className="text-3xl font-bold tracking-tighter mb-8">Checkout</h1>
           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                 <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2">Contact Info</h2>
                 <input type="email" required placeholder="Email Address" className="w-full bg-white border border-zinc-200 p-4 rounded-xl focus:outline-none focus:border-black transition-colors" />
              </div>
              
              <div className="space-y-4 pt-6">
                 <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2">Shipping Address</h2>
                 <div className="grid grid-cols-2 gap-4">
                    <input type="text" required placeholder="First Name" className="w-full bg-white border border-zinc-200 p-4 rounded-xl focus:outline-none focus:border-black transition-colors" />
                    <input type="text" required placeholder="Last Name" className="w-full bg-white border border-zinc-200 p-4 rounded-xl focus:outline-none focus:border-black transition-colors" />
                 </div>
                 <input type="text" required placeholder="Address" className="w-full bg-white border border-zinc-200 p-4 rounded-xl focus:outline-none focus:border-black transition-colors" />
                 <div className="grid grid-cols-3 gap-4">
                    <input type="text" required placeholder="City" className="col-span-1 bg-white border border-zinc-200 p-4 rounded-xl focus:outline-none focus:border-black transition-colors" />
                    <input type="text" required placeholder="State" className="col-span-1 bg-white border border-zinc-200 p-4 rounded-xl focus:outline-none focus:border-black transition-colors" />
                    <input type="text" required placeholder="ZIP" className="col-span-1 bg-white border border-zinc-200 p-4 rounded-xl focus:outline-none focus:border-black transition-colors" />
                 </div>
              </div>

              <div className="space-y-4 pt-6">
                 <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2">Payment</h2>
                 <div className="p-4 border border-zinc-200 rounded-xl bg-zinc-50 text-zinc-500 text-sm">
                    Payment processing is simulated for this demo. No card required.
                 </div>
              </div>

              <button type="submit" className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors mt-8">
                 Pay ${cartTotal}
              </button>
           </form>
        </div>

        {/* Right: Summary */}
        <div className="bg-white p-8 rounded-3xl h-fit sticky top-32 shadow-sm border border-zinc-100">
           <h2 className="text-xl font-bold mb-6">Order Summary</h2>
           <div className="space-y-6 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-zinc-100 rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                      </div>
                      <div>
                         <p className="font-bold">{item.name}</p>
                         <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                      </div>
                   </div>
                   <p className="font-medium">${item.price * item.quantity}</p>
                </div>
              ))}
           </div>
           
           <div className="border-t border-zinc-100 pt-6 space-y-2">
              <div className="flex justify-between text-zinc-500">
                 <span>Subtotal</span>
                 <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                 <span>Shipping</span>
                 <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 text-black">
                 <span>Total</span>
                 <span>${cartTotal}</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};