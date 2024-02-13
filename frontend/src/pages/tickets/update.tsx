import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/button";

interface GetTicketType {
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
  description: string;
  ticketReplies: { replyId: number | null, tId?: number | null, reply: string, replyDate: Date }[]
}

const AddReplySchema = Yup.object().shape({
  reply: Yup.string().required("Reply text is required"),
});

const addReply = ({ reply, ticketId }: { reply: string; ticketId: string }) => axios.post(`http://localhost:5134/api/tickets/${ticketId}/replies`, { reply })

export default function UpdateTicketPage() {
  const { id: ticketId } = useParams();
  const [data, setData] = useState<GetTicketType | null>(null);


  const formik = useFormik({
    initialValues: {
      reply: "",
    },
    validationSchema: AddReplySchema,
    onSubmit: async (values) => {
      if (ticketId) {
        addReply({ reply: values.reply, ticketId })
          .then(() => {
            if (data) {
              setData({ ...data, ticketReplies: [...data?.ticketReplies, { reply: values.reply, tId: null, replyDate: new Date(), replyId: null }] });
              formik.resetForm();
            }
          })
          .catch(() => {
            // handle error
          })
      }
    },
  });


  const fetchData = useCallback(() => {
    axios
      .get<GetTicketType>(`http://localhost:5134/api/tickets/${ticketId}`)
      .then((data) => {
        setData(data.data);
      })
      .catch(() => {
        // Error handling
        console.log("Error fetching data");
      });
  }, [ticketId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <div className="h-full p-8 w-full">

      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between flex-row">

          <div className="flex w-full flex-row justify-between max-w-[500px]">
            <h1 className="text-base font-bold text-black flex-1">Ticket #</h1>
            <p className="text-base font-medium text-black flex-1">{data?.id} - {data?.title}</p>
          </div>
          <div>
            <Button color="primary" onClick={() => { formik.submitForm() }}>Add Reply</Button>
          </div>
        </div>

        <div className="flex w-full flex-col justify-between my-4">
          <h1 className="text-base font-bold text-black">New Reply</h1>
          <textarea className="text-base font-medium text-black w-full border border-2 border-yellow-500 bg-yellow-500/5" rows={4} value={formik.values.reply} onChange={formik.handleChange} name="reply" />
        </div>

        <div className="w-full flex flex-row justify-start gap-x-8 pt-4">
          <div className="flex flex-col w-full max-w-[500px] gap-y-4">
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-base font-bold text-black flex-1">Module</h1>
              <p className="text-base font-medium text-black flex-1">{data?.applicationName}</p>
            </div>
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-base font-bold text-black flex-1">Urgent Lvl</h1>
              <p className="text-base font-medium text-black flex-1">{data?.priority.title}</p>
            </div>
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-base font-bold text-black flex-1">Type</h1>
              <p className="text-base font-medium text-black flex-1">{data?.ticketType.title}</p>
            </div>
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-base font-bold text-black flex-1">State</h1>
              <p className="text-base font-medium text-black flex-1">{data?.status.title}</p>
            </div>

            <div className="flex w-full flex-col justify-between gap-y-2">
              <h1 className="text-base font-bold text-black">Description</h1>
              <textarea className="text-base font-medium text-black w-full border border-2 border-black" rows={4} value={data?.description} />
            </div>
          </div>
          <div className="flex-1 flex flex-col max-w-[300px]">
            <div className="flex w-full flex-col">
              <h1 className="text-base font-bold text-black flex-1">Replies</h1>
              <div className="flex flex-col w-full border border-2 border-black max-h-[500px] overflow-y-scroll p-2">
                {data?.ticketReplies.map(({ reply }, index) =>
                  <p key={`reply-${index}`} className="text-base font-medium text-black flex-1 bg-slate-300 my-2">{reply}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
