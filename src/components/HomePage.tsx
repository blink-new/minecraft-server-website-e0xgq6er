const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gray-800 text-white p-8 overflow-y-auto">
      {/* Banner Image - Positioned Higher */}
      <div className="absolute top-0 left-0 right-0 h-64 flex items-center justify-center z-0">
        <img
          src="/banner.png"
          alt="Minecraft Server Banner"
          className="w-auto h-auto max-w-sm max-h-full object-contain opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto mt-48">
        <div className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-gray-700">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">CrimsonMc | Store</h1>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Welcome</h2>
              <p>
                If you've completed a purchase but haven't received your items, please open a support ticket on our Discord server for assistance. For any billing concerns or payment-related questions, you can also create a ticket, and our team will respond within 48 hours.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Refund Policy</h2>
              <p>
                All purchases are final and non-refundable. Initiating a chargeback or disputing a payment through PayPal will lead to a permanent and irreversible ban from all our servers and associated Minecraft stores.
              </p>
              <p className="mt-2">
                Please allow up to 20 minutes for your purchase to be processed in-game. If you do not receive your items within this timeframe, submit a support ticket on our Discord server with proof of purchase, and we will look into the issue.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-700 mt-6">
              <p className="text-sm text-gray-500">
                CrimsonMC is not affiliated with or endorsed by Minecraft, Mojang or Microsoft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
