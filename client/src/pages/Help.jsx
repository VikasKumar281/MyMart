const sections = [
  {
    id: "faq",
    title: "FAQs",
    body: "Create an account, add items to the cart, choose an address, and pay with cash on delivery or the test card. Sellers sign in from Seller Dashboard with the same email and password they used to register.",
  },
  {
    id: "delivery",
    title: "Delivery Information",
    body: "Orders are delivered to the address you save at checkout. Shipping is free on this store.",
  },
  {
    id: "returns",
    title: "Return & Refund Policy",
    body: "If an item arrives damaged, contact us from the Contact page with your order id. Cash on delivery orders can be refused at the door.",
  },
  {
    id: "payment",
    title: "Payment Methods",
    body: "Cash on delivery, or online test payment with card 4242 4242 4242 4242. Test mode does not charge a real card.",
  },
];

const Help = () => {
  return (
    <div className="mt-16 mb-16 max-w-3xl space-y-8">
      <p className="text-3xl font-medium">Help</p>
      {sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-xl font-medium text-green-700">{section.title}</h2>
          <p className="mt-2 text-gray-500">{section.body}</p>
        </section>
      ))}
    </div>
  );
};

export default Help;
