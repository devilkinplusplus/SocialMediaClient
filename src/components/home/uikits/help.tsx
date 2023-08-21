import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Help() {
  return (
    <>
      <div className="flex flex-col justify-start items-center mt-10 mx-10 px-5 rounded-lg bg-con-white h-auto">
        <p className="text-gray-600 font-medium text-2xl uppercase">
          Frequently Asked Questions
        </p>

        <div className="bg-white flex flex-col justify-between items-start py-4 px-4 rounded-md w-full h-auto font-medium">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="text-gray-500">
                How can I reset my password?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-gray-400 text-center">
                If you've forgotten your password, click on the "Forgot
                Password" link on the login page. You will be prompted to enter
                your email address, and we will send you instructions to reset
                your password.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="bg-white flex flex-col justify-between items-start py-4 px-4 rounded-md w-full h-auto font-medium">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="text-gray-500">
                How do I connect with other users?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-gray-400 text-center">
                You can connect with other users by sending them a friend or
                connection request, depending on the platform. You may also be
                able to search for specific users or find and join groups or
                communities based on your interests.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="bg-white flex flex-col justify-between items-start py-4 px-4 rounded-md w-full h-auto font-medium">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="text-gray-500">
                Are my personal details and data secure?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-gray-400 text-center">
                We take the security and privacy of your personal information
                seriously. We employ security measures and protocols to
                safeguard your data, and we do not share your information with
                third parties without your consent.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col justify-start items-center mx-10 py-10 px-5 rounded-lg bg-con-white h-auto">
        <p className="text-gray-600 font-medium text-2xl">TERMS OF SERVICE</p>

        <div className="bg-white flex flex-col justify-between items-start py-4 px-4 rounded-md w-full h-auto font-medium">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="text-gray-500">
                User Responsibilities
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-gray-400 text-center">
                You are responsible for maintaining the confidentiality of your
                account information and for all activities that occur under your
                account. You agree to use the Website in compliance with
                applicable laws and regulations.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="bg-white flex flex-col justify-between items-start py-4 px-4 rounded-md w-full h-auto font-medium">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="text-gray-500">
                Intellectual Property Rights
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-gray-400 text-center">
                All content and materials available on the Website, including
                but not limited to text, graphics, logos, images, and software,
                are the property of the Company or its licensors and are
                protected by intellectual property laws.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="bg-white flex flex-col justify-between items-start py-4 px-4 rounded-md w-full h-auto font-medium">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="text-gray-500">
                You agree not to engage in any of the following prohibited
                activities
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-gray-400 text-center">
                Violating any applicable laws or regulations. Impersonating
                another person or entity. Interfering with the operation or
                security of the Website. Uploading or transmitting viruses,
                malware, or other harmful code. Collecting or harvesting
                personal information of others.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default Help;
