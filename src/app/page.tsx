export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        SOLID Principles Practice
      </h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PrincipleCard 
          title="Single Responsibility Principle (SRP)"
          description="A class should have only one reason to change"
          href="/principles/srp"
          examples={["User Management", "Separation of concerns"]}
        />
        
        <PrincipleCard 
          title="Open/Closed Principle (OCP)"
          description="Software entities should be open for extension but closed for modification"
          href="/principles/ocp"
          examples={["Discount System", "Notification System"]}
        />
        
        <PrincipleCard 
          title="Liskov Substitution Principle (LSP)"
          description="Objects should be replaceable with instances of their subtypes"
          href="/principles/lsp"
          examples={["Payment Processors", "Shape Hierarchy"]}
        />
        
        <PrincipleCard 
          title="Interface Segregation Principle (ISP)"
          description="Many client-specific interfaces are better than one general-purpose interface"
          href="/principles/isp"
          examples={["CRUD Interfaces", "Role-based Interfaces"]}
        />
        
        <PrincipleCard 
          title="Dependency Inversion Principle (DIP)"
          description="Depend upon abstractions, not concretions"
          href="/principles/dip"
          examples={["Dependency Injection", "Repository Pattern"]}
        />
      </div>
    </div>
  );
}

function PrincipleCard({ 
  title, 
  description, 
  href, 
  examples 
}: { 
  title: string;
  description: string;
  href: string;
  examples: string[];
}) {
  return (
    <a 
      href={href}
      className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="text-sm text-gray-500 space-y-1">
        {examples.map((example, index) => (
          <li key={index}>• {example}</li>
        ))}
      </ul>
    </a>
  );
}