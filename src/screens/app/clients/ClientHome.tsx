import { useQClients } from "@/hooks/api/queries/client.queries";
import { PrimaryButton } from "@components/global/Buttons";
import Card from "@components/global/Card";
import Input from "@components/global/Input";
import TableOptions from "@components/global/TableOptions";
import Tables from "@components/global/Tables";
import { createColumnHelper } from "@tanstack/react-table";
import { TClient } from "@type/global.types";
import moment from "moment";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const ClientCard = ({
  title,
  value,
  percentage,
  // dateString,
  Icon,
}: {
  title: string;
  value: string;
  percentage: number;
  dateString: string;
  Icon: ReactNode;
}) => {
  let color = "";
  switch (Math.sign(percentage)) {
    case -1:
      color = "text-red-500";
      break;
    case 1:
      color = "text-green-500";
      break;

    default:
      color = "";
      break;
  }
  return (
    <Card className="col-span-1 flex h-[144px] flex-col justify-between">
      <div className="flex justify-between">
        <div className="space-y-1">
          <h4 className="text-semiNormal font-normal text-graySubtext">
            {title}
          </h4>
          <p className="text-xl font-medium">{value}</p>
        </div>
        {Icon}
      </div>
      <p className="text-xs text-graySubtext">
        <span className={color}>
          {/* {Math.sign(percentage) === 1 && "+"}
          {percentage}% */}
        </span>{" "}
        {/*  from {dateString} */}
      </p>
    </Card>
  );
};

const ClientHome = () => {
  const columnHelper = createColumnHelper<TClient>();
  const { result,isLoading } = useQClients({});
  const navigate = useNavigate();

  const columns = [
    columnHelper.accessor("clientId", {
      header: "Ext ref id",
    }),
    columnHelper.accessor("phones", {
      header: "No. of applications",
      cell: (info) => info.getValue().length || 0,
    }),
    columnHelper.accessor("lastModifiedAt", {
      header: "Last application date",
      cell: (info) =>
        info.getValue()
          ? moment(new Date(info.getValue())).format("MMM DD, YYYY - hh:mm A")
          : "",
    }),
    columnHelper.accessor("digitalCreditInfoHistory", {
      header: "Credit score evolution",
      cell: (info) => (info.getValue().length > 0 ? "stable" : "N/A"),
    }),
    // columnHelper.accessor("amountDue", {
    //   header: "amount",
    //   cell: (info) => "",
    //   // `${info.row.original.productsBilled[0].currency} ${info.getValue()}`,
    // }),
    // columnHelper.accessor("_createdAt", {
    //   header: "Date created",
    //   cell: (info) =>
    //     moment(
    //       new Date(
    //         info
    //           .getValue()
    //           .replace(/(\d{2}:\d{2}:\d{2})\d{2}([+-]\d{2}:\d{2})/, "$1$2"),
    //       ),
    //     ).format("MMM DD, YYYY"),
    // }),
    // columnHelper.accessor("status", {
    //   header: "Status",
    //   cell: (info) => {
    //     const status = info.getValue();
    //     let type: "success" | "error" = "success";
    //     switch (status) {
    //       case "paid":
    //         type = "success";
    //         break;

    //       default:
    //         type = "error";
    //         break;
    //     }
    //     return <Badge type={type}>{status}</Badge>;
    //   },
    // }),
    columnHelper.accessor(() => "action", {
      header: "Action",
      cell: (info) => {
        return (
          <TableOptions
            options={[
              {
                title: "View More",
                action: () =>
                  navigate(`/dashboard/clients/${info.row.original.clientId}`),
              },
              // {
              //   title: "Make Payment",
              //   action: () => {},
              // },
            ]}
          />
        );
      },
    }),
  ];

  return (
    <div className="w-full space-y-8 p-8">
      <section className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <ClientCard
          Icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.6 20H14.4C18.4 20 20 18.4 20 14.4V9.6C20 5.6 18.4 4 14.4 4H9.6C5.6 4 4 5.6 4 9.6V14.4C4 18.4 5.6 20 9.6 20Z"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 17H13.5C16 17 17 16 17 13.5V10.5C17 8 16 7 13.5 7H10.5C8 7 7 8 7 10.5V13.5C7 16 8 17 10.5 17Z"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.00977 4V2"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 4V2"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 4V2"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 8H22"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 12H22"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 16H22"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 20V22"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.0098 20V22"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.00977 20V22"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 8H4"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12H4"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 16H4"
                stroke="#62EAE1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          dateString="yesterday"
          percentage={0}
          title="Total Clients"
          value={`${result?.length || 0}`}
        />
        <ClientCard
          Icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.6 20H14.4C18.4 20 20 18.4 20 14.4V9.6C20 5.6 18.4 4 14.4 4H9.6C5.6 4 4 5.6 4 9.6V14.4C4 18.4 5.6 20 9.6 20Z"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 17H13.5C16 17 17 16 17 13.5V10.5C17 8 16 7 13.5 7H10.5C8 7 7 8 7 10.5V13.5C7 16 8 17 10.5 17Z"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.00977 4V2"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 4V2"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 4V2"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 8H22"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 12H22"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 16H22"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 20V22"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.0098 20V22"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.00977 20V22"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 8H4"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12H4"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 16H4"
                stroke="#011D7B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          dateString="yesterday"
          percentage={0}
          title="Total assesed devices"
          value={`${result?.[0]?.datasetsCountAllFromIp || 0}`}
        />
        <ClientCard
          Icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.6 20H14.4C18.4 20 20 18.4 20 14.4V9.6C20 5.6 18.4 4 14.4 4H9.6C5.6 4 4 5.6 4 9.6V14.4C4 18.4 5.6 20 9.6 20Z"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 17H13.5C16 17 17 16 17 13.5V10.5C17 8 16 7 13.5 7H10.5C8 7 7 8 7 10.5V13.5C7 16 8 17 10.5 17Z"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.00977 4V2"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 4V2"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 4V2"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 8H22"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 12H22"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 16H22"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 20V22"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.0098 20V22"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.00977 20V22"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 8H4"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12H4"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 16H4"
                stroke="#0067FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          dateString="yesterday"
          percentage={0}
          title="Avg credit score"
          value="N/A"
        />
        <ClientCard
          Icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.6 20H14.4C18.4 20 20 18.4 20 14.4V9.6C20 5.6 18.4 4 14.4 4H9.6C5.6 4 4 5.6 4 9.6V14.4C4 18.4 5.6 20 9.6 20Z"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 17H13.5C16 17 17 16 17 13.5V10.5C17 8 16 7 13.5 7H10.5C8 7 7 8 7 10.5V13.5C7 16 8 17 10.5 17Z"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.00977 4V2"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 4V2"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 4V2"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 8H22"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 12H22"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 16H22"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 20V22"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.0098 20V22"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.00977 20V22"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 8H4"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12H4"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 16H4"
                stroke="#FF9066"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          dateString="yesterday"
          percentage={0}
          title="Highest credit score"
          value="N/A"
        />
      </section>

      <section className="flex items-center justify-between">
        <div className="flex max-w-xs items-center gap-4">
          <Input isSearch placeholder="Search clients" />

          <button>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 28.5H21V25.5H15V28.5ZM9 19.5H27V16.5H9V19.5ZM4.5 7.5V10.5H31.5V7.5H4.5Z"
                fill="#718096"
              />
            </svg>
          </button>
        </div>
        <PrimaryButton size="medium" disabled={result?.length === 0}>
          Export CSV
        </PrimaryButton>
      </section>

      <section>
        <div className="">
          <Tables columns={columns} data={result || []} loading={isLoading} />
        </div>
      </section>
    </div>
  );
};

export default ClientHome;