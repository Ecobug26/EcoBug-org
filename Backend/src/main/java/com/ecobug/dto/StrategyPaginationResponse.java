package com.ecobug.dto;

import java.time.LocalDateTime;
import java.util.List;

public class StrategyPaginationResponse {

    private List<StrategyDTO> strategies;
    private int total;
    private int page;
    private int limit;
    private boolean hasMore;

    public StrategyPaginationResponse() {}

    public StrategyPaginationResponse(List<StrategyDTO> strategies, int total, int page, int limit, boolean hasMore) {
        this.strategies = strategies;
        this.total = total;
        this.page = page;
        this.limit = limit;
        this.hasMore = hasMore;
    }

    public List<StrategyDTO> getStrategies() { return strategies; }
    public void setStrategies(List<StrategyDTO> strategies) { this.strategies = strategies; }

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }

    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }

    public int getLimit() { return limit; }
    public void setLimit(int limit) { this.limit = limit; }

    public boolean isHasMore() { return hasMore; }
    public void setHasMore(boolean hasMore) { this.hasMore = hasMore; }
}