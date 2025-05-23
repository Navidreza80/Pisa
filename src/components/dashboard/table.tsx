
const Table = ({
  tableContent,
  tableHeader,
  notificationLineOne,
  notificationLineTwo,
  isNotification,
}) => {
  return (
    <>
      <table className="w-full text-sm border-separate border-spacing-y-4">
        <thead>
          <tr className="bg-table-main p-2 font-yekan text-text">
            {tableHeader.map((item, index) => {
              return (
                <th
                  key={index}
                  className={`p-2 text-lg  font-medium ${item.clx}`}
                >
                  {item.text}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {isNotification && notificationLineOne}
          {tableContent}
          {isNotification && notificationLineTwo}
        </tbody>
      </table>

      <div className="flex justify-end mt-[71px] gap-2">
        {[1, 2, 3, 4, 5].map((p) => (
          <button
            key={p}
            className={`w-8 h-8 rounded-full border text-sm ${p === 1 ? "bg-primary text-white" : "bg-background"}`}
          >
            {p}
          </button>
        ))}
      </div>
    </>
  );
};
export default Table;
