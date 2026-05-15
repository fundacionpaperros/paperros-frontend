import React from 'react';
import toast from 'react-hot-toast';

export const confirmToast = (
  message: string,
  options?: { confirmLabel?: string; danger?: boolean }
): Promise<boolean> =>
  new Promise((resolve) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 max-w-sm">
          <p className="text-sm font-medium text-gray-800">{message}</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => { toast.dismiss(t.id); resolve(false); }}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded hover:bg-gray-200 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={() => { toast.dismiss(t.id); resolve(true); }}
              className={`px-3 py-1.5 text-white text-xs font-medium rounded cursor-pointer ${
                options?.danger !== false
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {options?.confirmLabel ?? 'Eliminar'}
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  });
