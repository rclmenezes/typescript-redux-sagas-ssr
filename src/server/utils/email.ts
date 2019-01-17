import { MailData } from "@sendgrid/helpers/classes/mail";
import sgMail from "@sendgrid/mail";

import { IS_PRODUCTION, SENDGRID_API_KEY } from "../../settings";

type SendMail = (data: MailData) => Promise<any>;

let sendMail: SendMail;
if (IS_PRODUCTION) {
  if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
  } else {
    // tslint:disable-next-line
    console.log("Error! Sendgrid API Key is not set in production mode.");
  }
  sendMail = async (data: MailData) => {
    await sgMail.send(data);
  };
} else {
  sendMail = async (data: MailData) => {
    /* tslint:disable */
    console.log("Sending email");
    console.log(JSON.stringify(data, null, 4));
    /* tslint:enable */
  };
}

export default sendMail;
