import Button from "@/components/Button/content";

export default function Popup({ message, onConfirm, onCancel, singleButton = false }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
        <p className="text-gray-800 mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          {singleButton ? (
            <Button
              id="confirm-button"
              label="Confirmar"
              color="bg-green-600 text-white"
              onClick={onConfirm}
            />
          ) : (
            <>
              <Button
                id="cancel-button"
                label="Cancelar"
                color="bg-gray-300 text-black"
                onClick={onCancel}
              />
              <Button
                id="confirm-button"
                label="Confirmar"
                color="bg-red-500 text-white"
                onClick={onConfirm}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
