export class DbFlowError {
    constructor(
        public code?: number,
        public text?: string,
        public detail?: string
    ) {}
}