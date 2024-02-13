import React, { useCallback, useEffect, useState } from "react";

import DataTable, { TableDefinition } from "../../components/datatable";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { routeNames } from "../../utils/routes";
import axios from "axios";
import Pill from "../../components/pill";

interface GetTicketsType {
  id: number;
  title: string;
  priority: {
    id: number;
    title: string;
  };
  status: {
    id: number;
    title: string;
  };
  ticketType: {
    id: number;
    title: string;
  };
  applicationName: string;
}

export default function AllTicketsPage() {
  const [data, setData] = useState<{ totalCount: number, tickets: Array<GetTicketsType> } | null>();

  const navigate = useNavigate();


  const fetchData = useCallback(({ page, rowsPerPage }: { page: number; rowsPerPage: number }) => {
    axios
      .get<{ totalCount: number, tickets: Array<GetTicketsType> }>(`http://localhost:5134/api/tickets?page=${page}&rowsPerPage=${rowsPerPage}`)
      .then((data) => {
        setData(data.data);
      })
      .catch(() => {
        // Error handling
        console.log("Error fetching data");
      });
  }, []);

  useEffect(() => {
    fetchData({ page: 1, rowsPerPage: 5 });
  }, [fetchData]);

  const renderPriorityColumn = (data: GetTicketsType["priority"]) => {
    return <Pill>{data.title}</Pill>;
  };

  const renderActionsColumn = (data: GetTicketsType["id"]) => {
    return (
      <div>
        <Button
          color={"primary"}
          onClick={() =>
            navigate(routeNames.editTicket.replace(":id", data.toString()))
          }
        >
          Edit
        </Button>
      </div>
    );
  };

  const columns: Array<TableDefinition> = [
    {
      name: "Lvl",
      data: "priority",
      render: renderPriorityColumn,
    },
    { name: "#", data: "id" },
    { name: "Title", data: "title" },
    { name: "Module", data: "applicationName" },
    { name: "Type", data: "ticketType.title" },
    { name: "State", data: "status.title" },
    {
      name: "Actions",
      data: "id",
      render: renderActionsColumn,
    },
  ];

  return (
    <div className="h-full p-8">
      {/* Page Header */}
      <div className="flex w-full flex-row justify-start px-4">
        <h1 className="text-base font-bold text-black">Tickets</h1>
      </div>

      <DataTable
        columns={columns}
        data={data?.tickets}
        totalCount={data?.totalCount ?? 5}
        onRowsPerPageChange={(page, rowsPerPage) => {
          fetchData({ page, rowsPerPage });
        }}
        onPageChange={(page, rowsPerPage) => {
          fetchData({ page, rowsPerPage });
        }}
      />
    </div>
  );
}
