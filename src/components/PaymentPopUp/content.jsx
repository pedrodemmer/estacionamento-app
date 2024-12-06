import Button from "@/components/Button/content";
import Input from "@/components/Input/content";
import { useState } from "react";

export default function PaymentPopup({ onConfirm, onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardHolder, setCreditCardHolder] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [pixKey, setPixKey] = useState(
    "00020126360014BR.GOV.BCB.PIX0114+55474444444445204000053039865802BR5924CityPark Estacionamentos6008Blumenau62160512PARKBLUMENAU63045E71"
  );
  const [copyMessage, setCopyMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    creditCardNumber: "",
    creditCardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const handlePaymentConfirm = () => {
    setFormErrors({
      creditCardNumber: "",
      creditCardHolder: "",
      expirationDate: "",
      cvv: "",
    });

    let hasError = false;
    if (paymentMethod === "creditCard") {
      if (creditCardNumber.length !== 19) {
        setFormErrors((prev) => ({
          ...prev,
          creditCardNumber: "Número de cartão inválido.",
        }));
        hasError = true;
      }
      if (creditCardHolder.trim() === "") {
        setFormErrors((prev) => ({
          ...prev,
          creditCardHolder: "Nome do titular é obrigatório.",
        }));
        hasError = true;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
        setFormErrors((prev) => ({
          ...prev,
          expirationDate: "Data de validade inválida.",
        }));
        hasError = true;
      }
      const currentDate = new Date();
      const [month, year] = expirationDate
        .split("/")
        .map((item) => parseInt(item, 10));
      const expirationDateObj = new Date(`20${year}-${month}-01`);

      if (expirationDateObj < currentDate) {
        setFormErrors((prev) => ({
          ...prev,
          expirationDate:
            "Data de validade não pode ser anterior ao mês atual.",
        }));
        hasError = true;
      }

      if (cvv.length !== 3) {
        setFormErrors((prev) => ({
          ...prev,
          cvv: "Código CVV deve ter 3 dígitos.",
        }));
        hasError = true;
      }
    }

    if (hasError) return;

    onConfirm({
      method: paymentMethod,
      creditCardNumber,
      creditCardHolder,
      expirationDate,
      cvv,
      pixKey,
    });
  };

  const handleCreditCardChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
    setCreditCardNumber(formattedValue);
  };

  const handleExpirationDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d)/g, "$1/").slice(0, 5);
    setExpirationDate(formattedValue);
  };

  const handlePixCopy = () => {
    navigator.clipboard
      .writeText(pixKey)
      .then(() => {
        setCopyMessage("Chave Pix copiada!");
        setTimeout(() => setCopyMessage(""), 2000);
      })
      .catch(() => {
        setCopyMessage("Erro ao copiar a chave Pix.");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Pagamento</h2>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">
            Método de Pagamento:
          </label>
          <div className="flex gap-4">
            <button
              className={`py-2 px-4 rounded-lg ${
                paymentMethod === "creditCard"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPaymentMethod("creditCard")}
            >
              Cartão de Crédito
            </button>
            <button
              className={`py-2 px-4 rounded-lg ${
                paymentMethod === "pix"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPaymentMethod("pix")}
            >
              Pix
            </button>
          </div>
        </div>

        {paymentMethod === "creditCard" && (
          <>
            <div>
              <label htmlFor="creditCard" className="block text-gray-800 mb-2">
                Número do Cartão:
              </label>
              <Input
                id="creditCard"
                placeholder="0000 0000 0000 0000"
                value={creditCardNumber}
                onChange={handleCreditCardChange}
                maxLength={19}
                error={formErrors.creditCardNumber}
              />
              {formErrors.creditCardNumber && (
                <p className="text-red-500 text-sm">
                  {formErrors.creditCardNumber}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="creditCardHolder"
                className="block text-gray-800 mb-2"
              >
                Nome do Titular:
              </label>
              <Input
                id="creditCardHolder"
                placeholder="Nome do titular"
                value={creditCardHolder}
                onChange={(e) => setCreditCardHolder(e.target.value)}
                error={formErrors.creditCardHolder}
              />
              {formErrors.creditCardHolder && (
                <p className="text-red-500 text-sm">
                  {formErrors.creditCardHolder}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="expirationDate"
                className="block text-gray-800 mb-2"
              >
                Data de Validade (MM/AA):
              </label>
              <Input
                id="expirationDate"
                placeholder="MM/AA"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                maxLength={5}
                error={formErrors.expirationDate}
              />
              {formErrors.expirationDate && (
                <p className="text-red-500 text-sm">
                  {formErrors.expirationDate}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="cvv" className="block text-gray-800 mb-2">
                Código CVV:
              </label>
              <Input
                id="cvv"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
                error={formErrors.cvv}
              />
              {formErrors.cvv && (
                <p className="text-red-500 text-sm">{formErrors.cvv}</p>
              )}
            </div>
          </>
        )}

        {paymentMethod === "pix" && (
          <div className="mt-4">
            <label className="block text-gray-800 mb-2">Chave Pix:</label>
            <div className="flex items-center bg-gray-100 p-2 rounded-lg">
              <p className="text-gray-700 flex-grow text-xs truncate">
                {pixKey}
              </p>
              <button
                className="text-blue-500 font-semibold hover:underline ml-2"
                onClick={handlePixCopy}
              >
                Copiar
              </button>
            </div>
            {copyMessage && (
              <p className="text-green-500 text-sm mt-1">{copyMessage}</p>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <Button id="cancel-payment-button" label="Cancelar" color="bg-red-600" onClick={onCancel} />
          <Button
            id="confirm-payment-button"
            label="Confirmar"
            color="bg-green-500"
            onClick={handlePaymentConfirm}
          />
        </div>
      </div>
    </div>
  );
}
