import AppError from "../../errors/AppError";
import GetDefaultWhatsApp from "../../helpers/GetDefaultWhatsApp";
import { getWbot } from "../../libs/wbot";

const CheckIsValidContact = async (
  number: string,
  companyId: number
): Promise<void> => {
  const defaultWhatsapp = await GetDefaultWhatsApp(companyId);

  const wbot = getWbot(defaultWhatsapp.id);

  try {
    const [isValidNumber] = await wbot.onWhatsApp(`${number}@s.whatsapp.net`);
    if (!isValidNumber || !isValidNumber.exists) {
      throw new AppError("invalidNumber");
    }
  } catch (err: any) {
    if (err.message === "invalidNumber") {
      throw new AppError("ERR_WAPP_INVALID_CONTACT");
    }
    throw new AppError("ERR_WAPP_CHECK_CONTACT");
  }
};

export default CheckIsValidContact;
