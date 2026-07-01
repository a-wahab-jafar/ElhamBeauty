import React from 'react'

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
      <div className="bg-gray-200 rounded-md w-full h-40 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}

export const ProductTableSkeleton = ({ rows = 6 }) => {
  return (
    <div className="w-full md:p-4 p-2">
      <div className="w-full overflow-hidden rounded-md bg-white border border-gray-500/10">
        <div className="w-full overflow-x-auto p-4 md:hidden">
          <div className="space-y-4">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 rounded p-2 w-16 h-16"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-full overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {Array.from({ length: rows }).map((_, i) => (
                <tr key={i} className="border-t border-gray-500/10">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                    <div className="bg-gray-200 rounded p-2 w-16 h-16"></div>
                    <span className="block h-4 bg-gray-200 rounded w-3/4"></span>
                  </td>
                  <td className="px-4 py-3"><div className="h-3 bg-gray-200 rounded w-24"></div></td>
                  <td className="px-4 py-3"><div className="h-3 bg-gray-200 rounded w-20"></div></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 bg-gray-200 rounded w-20" />
                      <div className="h-8 bg-gray-200 rounded w-20" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const ProductDetailSkeleton = () => {
  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="rounded-lg overflow-hidden bg-gray-200/60 mb-4 h-72 animate-pulse"></div>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="cursor-pointer rounded-lg overflow-hidden bg-gray-200/60 h-20 animate-pulse"></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-full my-6 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 mt-16">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="w-28 h-0.5 bg-gray-200 rounded mt-2 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
              <div className="bg-gray-200 rounded-md w-full h-32 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Fallback = {
  ProductCardSkeleton,
  ProductTableSkeleton,
  ProductDetailSkeleton,
}

export default Fallback
