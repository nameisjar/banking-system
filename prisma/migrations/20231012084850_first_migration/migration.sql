-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "identityType" TEXT NOT NULL,
    "identityNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccounts" (
    "id" SERIAL NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankAccountNumber" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BankAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "destinationAccountId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "sourceAccountId" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_identityType_key" ON "Profile"("identityType");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_identityNumber_key" ON "Profile"("identityNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccounts_bankAccountNumber_key" ON "BankAccounts"("bankAccountNumber");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccounts" ADD CONSTRAINT "BankAccounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_sourceAccountId_fkey" FOREIGN KEY ("sourceAccountId") REFERENCES "BankAccounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_destinationAccountId_fkey" FOREIGN KEY ("destinationAccountId") REFERENCES "BankAccounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
