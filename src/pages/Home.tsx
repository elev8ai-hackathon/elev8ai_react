export const Home = () => {
  return (
    <div>
      <header className="p-6">
        <h1 className="text-center  text-2xl font-bold">Elev8 AI</h1>
      </header>
      <main className="mt-4 grid grid-cols-2 p-4 gap-4">
        <section className="col-span-1 border border-primary rounded-2xl p-4">
          Summary
        </section>
        <section className="col-span-1 border border-primary rounded-2xl p-4">
          chat
        </section>
      </main>
    </div>
  );
};
